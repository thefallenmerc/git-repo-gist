<p align="center">
 <h2 align="center">Github Repo Gist</h2>
 <p align="center">This project imitates the Gist functionality provided by github but with a little twist, it works for
    repository source files.</p>

  <p align="center">
    <a href="https://github.com/thefallenmerc/git-repo-gist/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/thefallenmerc/git-repo-gist?color=0088ff" />
    </a>
    <a href="https://github.com/thefallenmerc/git-repo-gist/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/thefallenmerc/git-repo-gist?color=0088ff" />
    </a>
  </p>

  <p align="center">
    <a href="https://git-repo-gist.herokuapp.com/framed/thefallenmerc/git-repo-gist/master/app.js">View Demo</a>
    ·
    <a href="https://github.com/thefallenmerc/git-repo-gist/issues">Report Bug</a>
    ·
    <a href="https://github.com/thefallenmerc/git-repo-gist/issues">Request Feature</a>
  </p>
</p>

# Index

- [Github Repo Gist](#github-stats-card)
- [How to use it](#how-to-use-it)
- [Customization](#customization)

# Github Repo Gist

Github provides you with the functionality to make and embed a gist anywhere on the internet, but there's something missing, what if we want to share a gist of code from existing repo without the need of creating a new gist for it?

This is where this code comes in.

### How to use it

There are few simple steps to get gist out of code - 

- Get the `uri` to the `raw` file, for eg `https://raw.githubusercontent.com/thefallenmerc/git-repo-gist/master/app.js`
- extract the part starting from your username till end, (everything after `https://raw.githubusercontent.com/`), we get `thefallenmerc/git-repo-gist/master/app.js`
- Append this to our base url with any of the option available in between, the solution is hosted at [https://git-repo-gist.herokuapp.com/](https://git-repo-gist.herokuapp.com/), thus we get `https://git-repo-gist.herokuapp.com/<option>/thefallenmerc/git-repo-gist/master/app.js`, where option can have the following value -
    - __gist__: gives back and actual gist script
    - __framed__: gives back an iframe with the gist in it

<!-- >> Options: `&hide=["stars","prs","issues","contribs"]` -->

### Customization

Coming soon...
  
  
---
---


Contributions are welcomed! <3

Made with :heart: and javascript.