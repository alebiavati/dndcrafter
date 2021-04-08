# -*- mode: Python -*

# Deploy Flow Emulator

# args = [
#   "kubectl",
#   "create",
#   "secret",
#   "generic",
#   "ledger",
#   "--from-env-file",
#   "./ledger/.env",
#   "-o=yaml",
#   "--dry-run=client"
# ]

# k8s_yaml(local(args))

# load('ext://secret', 'secret_create_generic')
# secret_create_generic('ledger-dotfile', from_file='.env=./ledger/.env')

docker_build('tilt.dev/flow', './flow')
# docker_build('tilt.dev/flow', './flow',
#   live_update=[
#     sync('./flow/contracts', '/app/contracts'),
#     run('flow project deploy', trigger=['./flow/contracts/', './flow/yarn.lock']),
# ])
# k8s_yaml('./ledger/kubernetes.yaml')
# k8s_resource('ledger', port_forwards=[8080,3569])

# Deploy Client
docker_build('tilt.dev/wallet', './flow',
  dockerfile='./flow/Dockerfile.wallet',
  build_args={'node_env': 'development'})

docker_build('tilt.dev/client', './client',
  build_args={'node_env': 'development'},
  live_update=[
    sync('./client', '/app'),
    run('cd /app && yarn install', trigger=['./client/package.json', './client/yarn.lock']),
])

# k8s_yaml('./client/kubernetes.yaml')
# k8s_resource('client', port_forwards=3000)

docker_compose("./docker-compose.yml")
