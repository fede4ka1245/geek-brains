#!/bin/env python3

from argparse import ArgumentParser
from config import s3, db_session

if __name__ == "__main__":
    argument_parser = ArgumentParser()
    argument_parser.add_argument("-w", "--worker", action="store_true", default=False)

    parsed_arguments = argument_parser.parse_args()

    if not parsed_arguments.worker:
        print("starting server")
        import uvicorn
        uvicorn.run("src.server:app", reload=True, host='0.0.0.0')
    else:
        print("starting worker")
        from src.worker import main as worker_main
        worker_main(db_session, s3)