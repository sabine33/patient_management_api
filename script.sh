 #find docker container ip
 docker inspect -f \ '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 0df9f6aaf1fa