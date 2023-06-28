import asyncio
import aiotieba as tb
from typing import List
import time

async def get_top(fname: str , num:int) -> list:
    '''
    (浏览量,帖子ID,帖子名)
    '''

    start_time: float = time.perf_counter()
    tb.LOG().info("Spider start")
    thread_list: List[tb.typing.Thread] = []

    async with tb.Client("default") as client:
        task_queue:asyncio.Queue = asyncio.Queue(maxsize=8)
        is_running:bool = True

        async def producer() -> None :
            for pn in range(32, 0, -1):
                await task_queue.put(pn)
            nonlocal is_running
            is_running = False

        async def worker(i: int) -> None:
            while 1:
                try:
                    pn:int = await asyncio.wait_for(task_queue.get(), timeout=1)
                    tb.LOG().debug(f"Worker#{i} handling pn:{pn}")
                except asyncio.TimeoutError:
                    if is_running is False:
                        tb.LOG().debug(f"Worker#{i} quit")
                        return
                else:
                    threads:tb.typing.Threads = await client.get_threads(fname, pn)
                    nonlocal thread_list
                    thread_list += threads

        workers:list = [worker(i) for i in range(8)]
        await asyncio.gather(*workers, producer())

    tb.LOG().info(f"Spider complete. Time cost: {time.perf_counter()-start_time:.4f} secs")
    thread_list.sort(key=lambda thread: thread.view_num, reverse=True)

    # for i, thread in enumerate(thread_list[0:10], 1):
    #     tb.LOG().info(f"Rank#{i} view_num:{thread.view_num} tid:{thread.tid} title:{thread.title}")
    if num > thread_list.__len__():
        num = 20
    res = list(map( lambda x:(x.view_num,x.tid,x.title),thread_list[0:num]) )
    key = ["view" , "tid" , "name"]
    result =  list(map( lambda x : zip(key , x) , res ))
    return result



async def get_all_comments(tid:int , num:int ) -> list:
    '''
    (楼层,用户名,评论)
    '''

    start_time: float = time.perf_counter()
    tb.LOG().info("Spider start")
    res_list: List[tb.typing.Post] = []

    async with tb.Client("default") as client:
        posts : tb.typing.Posts= await client.get_posts(tid)

        page_num: int = posts.page.total_page
        page_queue:asyncio.Queue = asyncio.Queue(maxsize=8)
        is_running:bool = True

        async def producer()->None:
            for pn in range(page_num+1):
                await page_queue.put(pn+1)
            nonlocal is_running
            is_running = False

        async def worker(i:int)->None:
            while 1:
                try:
                    pn:int = await asyncio.wait_for(page_queue.get() , timeout=1)
                    tb.LOG().debug(f"Worker#{i} handling pn:{pn}")
                except asyncio.TimeoutError:
                    if is_running is False:
                        tb.LOG().debug(f"Worker#{i} quit")
                        return
                else:
                    p: tb.typing.Posts = await client.get_posts( tid ,pn=pn )
                    nonlocal res_list
                    res_list += p

        workers:list = [worker(i) for i in range(8)]
        await asyncio.gather(producer() , *workers)

    res_list.sort(key= lambda x:x.floor)
    res:list = list(
        map( lambda x:( x.floor , x.reply_num ,x.user.user_name,x.text) , res_list)
        )
    tb.LOG().info(f"Spider complete. Time cost: {time.perf_counter()-start_time:.4f} secs")
    
    res = res[0:num if num < res.__len__() else res.__len__() -1]
    key = ["floor" , "reply" , "user" , "text"]
    result = list(map( lambda x : zip(key , x) , res ))

    return result


async def get_bar():
    res = []
    async with tb.Client("default") as client:
        for i in range(1, 10):
            forums = await client.get_follow_forums("admintest12345" , pn=i)
            res += [forum.fname for forum in forums]
            if not forums.has_more:
                break
    return res