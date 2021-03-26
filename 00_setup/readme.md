# Steps

## Setup Minikube
- Install minikube 
- Run start-minikube.sh setup initial cluster. Adjust the cluster size to suite your setup. You may want to delete the `--driver kvm2` option and use Docker for your setup
- Get minikube IP address `minikube ip` eg. `192.168.0.10`
- Configure metallb address range: `minikube addons configure metallb`. Should be in the same network as minikube eg. `192.168.0.20` to `192.168.0.25`
- Enable metallb addon `minikube addons enable metallb`. This addon will be used to allocate an IP address for the load balancer when we install the ingress controller
- Verify addons is enabled `minikube addons list`
- Install ingress-nginx with `ingress.yaml`. Will be installed in `ingress-nginx` namespace
- Check pods, deployment and service are installed. Note the external IP address in `ingress-nginx` namespace
- Use the allocated exteral IP address of the ingress controller and browse it. You should see a '404 Not Found' page
- Install sealed secrets `sealedsecrets.yaml`

## Install krew and plugins - Optional
- See [https://krew.sigs.k8s.io/docs/user-guide/setup/install/](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
- Install the following plugins with krew
  - [access matrix](https://github.com/corneliusweig/rakkess) 
  - [rolesum](https://github.com/Ladicle/kubectl-rolesum)
  - [ingress nginx](https://kubernetes.github.io/ingress-nginx/kubectl-plugin/)
