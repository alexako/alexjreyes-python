import pusher
import os


pusher_client = pusher.Pusher(
        app_id=os.environ["APP_ID"],
        key=os.environ["KEY"],
        secret=os.environ["SECRET"],
        ssl=True
        )
