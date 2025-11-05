## Running the app locally

### Standalone development

Install packages, then run `npm run start` to start the app on http://localhost:3000/ which you can visit in the browser. You can develop locally this way for most scenarios.

### OpenAI

As per the `.env.example` file, you will need those details from OpenAI. I've used Azure AI Foundry to get these values.

The app defaults to connecting with OpenAI but I can use a static processor for replies by updating the env variable `VITE_PROCESS_USING_THIRD_PARTY`, or a mock client for local developing (and saving tokens) by updating the env variable `VITE_USE_THIRD_PARTY_MOCK`.

### Miro.com

Go to Miro.com, click on Profile, then click on Your apps.

If starting afresh, you will need to create a Miro app (SDK v2) and point to the public url http://localhost:3000/. Give this app a suitable name and icons. No permissions required. For my existing account, there should be one app registered called Clyde Recommends and another one called Clyde Recommends Development.

The Clyde Recommends app represents the publicly published app. It points to the Netlify website to load its contents.

The Clyde Recommends Development app represents the local development version. It points to the public url http://localhost:3000/ which is available when we start the app locally as mentioned above.

## Build and deployments

Project is connected to and built and deployed using Netlify. See [Netlify project here](https://app.netlify.com/projects/clyde-recommends-miro-app/deploys). The env variables as listed in the `.env.example` file are also entered in Netlify.

This project uses the Netlify plugin `@clydedsouza/netlify-plugin-github-deploy-status` to add a commit status indicator on commits. This plugin requires the environment variables `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, and `GITHUB_REPO_NAME` to exist in Netlify.

I've generated a fine-grained PAT called "netlify notification miro recommends app" with `Read and Write access to commit statuses` and `Read access to metadata` permissions.

## Installing the app in Miro.com

The app is already published in the marketplace and the link can be found from the [Readme file](./README.md). For app updates, merging code to main branch will publish a new version to Netlify. This website is directly served in the Miro app. We don't need to republish the Miro app.

We only need to republish the Miro app if you're making app changes in Miro e.g. updating app permissions, icon, name, etc.
