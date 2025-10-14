# ETIS-3.0

A fork and evolution of the 'ETIS 2.0' extension with new features and a modern tech stack.

## Development

1.  **Install dependencies:**
    ```bash
    yarn install
    ```

2.  **Build the extension for production:**
    This will create a `dist` folder ready for unpacking into the browser.
    ```bash
    yarn build
    ```

3.  **Watch for changes and rebuild automatically:**
    Use this for active development. After each change, you'll need to reload the extension in your browser.
    ```bash
    yarn build:watch
    ```

## Release Guide

This project uses git tags to trigger the release workflow in GitHub Actions. The workflow automatically builds the extension, creates a GitHub Release, and attaches the installable `.zip` archive.

### How to create a Stable Release (from `master` branch)

Use standard semantic versioning (e.g., `v1.2.0`).

```bash
# 1. Ensure you are on the master branch and it's up to date
git checkout master
git pull origin master

# 2. Update the version in package.json (e.g., from 1.1.0 to 1.2.0)
# Commit this change. It's crucial for tracking release versions.
# For example:
# "version": "1.2.0"
git add package.json
git commit -m "chore: release v1.2.0"

# 3. Create a git tag that matches the version in package.json
git tag v1.2.0

# 4. Push the commit and the tag to trigger the release workflow
git push origin master
git push origin v1.2.0
```

### How to create a Beta Release (from `development` branch)

Beta versions should include a `-beta.N` suffix (e.g., `v1.3.0-beta.0`).

```bash
# 1. Ensure you are on the development branch and it's up to date
git checkout development
git pull origin development

# 2. Update the version in package.json with a -beta suffix
# For example:
# "version": "1.3.0-beta.0"
git add package.json
git commit -m "chore: release v1.3.0-beta.0"

# 3. Create a git tag that matches the beta version
git tag v1.3.0-beta.0

# 4. Push the commit and the tag to trigger the release workflow
git push origin development
git push origin v1.3.0-beta.0
```

After pushing the tag, go to the "Releases" section of the GitHub repository to check the status of the automated release. The beta release will be marked as "Pre-release".

## ETIS-2.0

https://github.com/ENAleksey/etis-extension

