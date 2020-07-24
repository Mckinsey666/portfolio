# Google Software Product Sprint

This repo contains Brian Chao's portfolio and SPS projects.
## appengine dev and deploy
### Local dev
```
mvn package appengine:run
export GOOGLE_APPLICATION_CREDENTIALS=“/home/bchao/software-product-sprint/credentials.json”
```
### deploy
```
gcloud config set project <project-id>
gcloud app create
mvn package appengine:deploy
```
### datastore queries
- Remember to add `datastore-indexes.xml` to `WEB-INF` folder.
- If not added manually, appengine would automatically generate indexes (based on your local dev queries) in the `WEB-INF/appengine-generated/datastore-indexes-auto.xml` file in `target` dir. Make sure to add the automatically generated indexes in the `WEB-INF/datastore-indexes.xml` before deploying.