import os
import time

def environ(request):
    try:
        version_hash = os.environ['DEPLOYED_GIT_COMMIT_HASH']
        dot_prefixed_version_hash = '.' + version_hash
    except KeyError:
        version_hash = ''
        dot_prefixed_version_hash = ''

    return {
        'dot_prefixed_version_hash': dot_prefixed_version_hash,
        'version_hash': version_hash,
    }
