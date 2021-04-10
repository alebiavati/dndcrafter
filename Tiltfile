# -*- mode: Python -*

docker_build('tilt.dev/flow', './flow',
  live_update=[
    sync('./flow/contracts', '/app/contracts'),
    run('flow project deploy'),
])

docker_build('tilt.dev/wallet', './wallet',
  build_args={'node_env': 'development'},
  live_update=[
    sync('./wallet', '/app'),
    run('cd /app && yarn install', trigger=['./wallet/package.json', './wallet/yarn.lock']),
])

docker_build('tilt.dev/client', './client',
  build_args={'node_env': 'development'},
  live_update=[
    sync('./client', '/app'),
    run('cd /app && yarn install', trigger=['./client/package.json', './client/yarn.lock']),
])

docker_compose("./docker-compose.yml")
