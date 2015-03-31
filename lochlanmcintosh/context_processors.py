import os
import time

def environ(request):
    try:
        version_hash = os.environ['DEPLOYED_GIT_COMMIT_HASH']
    except KeyError:
        version_hash = time.time()

    return {
        'version_hash': version_hash,
    }
