# -*- mode: Python -*

# Deploy Flow Emulator
docker_build('ledger-image', './ledger')
k8s_yaml('./ledger/kubernetes.yaml')
k8s_resource('ledger', port_forwards=[8080,3569])

# Deploy Client
docker_build('client-image', './client',
    build_args={'node_env': 'development'},
    live_update=[
        sync('./client', '/app'),
        run('cd /app && yarn install', trigger=['./client/package.json', './client/yarn.lock']),
])
k8s_yaml('./client/kubernetes.yaml')
k8s_resource('client', port_forwards=3000)
