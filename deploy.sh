# npm run build && cd build && git init && git add . && git commit -m "Deployment release" && git remote add production ssh://techbyte@23.106.120.176/home/techbyte/ppm_api.git && git push production master --force
yarn build && git add . && git commit -m "Deployment release" && git push origin staging