#!/bin/bash
minikube start \
	--memory 8192 --cpus 2 \
	--driver kvm2 \
	--cni cilium \
	--addons metrics-server
