# Creating a GitHub application
!!! info
    Injectify uses a GitHub SSO based system for authentication, instead of locally managing credentials. This makes it securer and adds the ability to utilise GitHub gists, repos etc.

1. Head over to [GitHub.com](https://github.com) and create an account if you haven't already.
2. Create a [new GitHub application](https://github.com/settings/applications/new) and specify the following values:

    | Field                      | Value                        |
    |----------------------------|------------------------------|
    | Application name           | any                          |
    | Homepage URL               | any                          |
    | Application description    | any                          |
    | Authorization callback URL | `https://injectify.samdd.me` |

    ??? note "What it should look like"
        <img src="https://i.imgur.com/oiuiMhR.png" alt="GitHub Applications page" height="310">