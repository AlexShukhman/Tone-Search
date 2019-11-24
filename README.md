# Tone-Search

_Search how people feel about your query._

owner: [Alex Shukhman](https://github.com/alexshukhman)

## Description

A web-scraper (using [Google Puppeteer](https://developers.google.com/web/tools/puppeteer)) and tone analysis tool (using [IBM Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/)) for analyzing the tone of comments related to a search query.

**Potential Uses:**

- Preliminary product analysis
- Social media injestion
- "Expert" (_remember:_ garbage in, garbage out) opinion agglomeration and analysis
- [Powerful cloud-based webscraping](#Legal-Note), capable of being run in any server (including Kubernetes, serverless solutions and others) -- _this requires some upgrades, but the bones are there_

## Quickstart

1. `git clone <this repo>`
2. `cd <this repo>`
3. `sudo chmod +x install.sh` -- _this makes it so that you can run the file_
4. `./install.sh` -- _this runs the install script (see [requirements](#Requirements))_
5. Verify that you are in the `python` directory
6. `python main.py` or `python3 main.py` (depending on the run command you use for Python3)

## Requirements

- A Unix-like operating system (or at least terminal) like MacOSX or Ubuntu
- Node.js and matching NPM.js (ES2017+ -- Node8+)
- Python3 and matching Pip ([I](https://github.com/alexshukhman) use Anaconda3)
- A valid IBM account with [Tone Analyzer](https://cloud.ibm.com/catalog/services/tone-analyzer) with access to version `2017-09-21`

## Additional Notes

### On Firebase

While this project is set up as a Firebase project, [I've](https://github.com/alexshukhman) included [a file](functions/modules) to allow you, dear user, to use it either from the [Python SDK](python/main.py) or from the terminal/bash script of your choosing. Usage from bash or other Unix-like terminals is as follows:

```sh
cd functions
npm run build # this builds the TypeScript into JavaScript
cd lib
node -e 'require("./modules").<your function>(<params>)' > <somefile>.json
```

As you can see, the results are always in JSON format. See the [interfaces file](functions/src/interfaces/index.ts) for more insight.

### On Other Usage

As a sole developer of this project, [I](https://github.com/alexshukhman) can't promise that you won't find any bugs (and if you do, [please report!](https://github.com/AlexShukhman/Tone-Search/issues)), never mind compatability with other tools etc.

To add functionality, either fork then PR or branch (use format `<git_username>/<function-description>`) then PR. You will likely be blocked otherwise.

If you would like to discuss collaboration, [email me!](https://email-alex.com) I would be happy to chat.

## Legal Note

_[I](https://github.com/alexshukhman) am not a lawyer_, but web scraping and web crawling (both of which are used in this repo) are legal _gray areas_. _This tool is not intended for commercial use._ [I](https://github.com/alexshukhman) don't intend on monitizing this platform or using it to steal or otherwise attain data that is 1) otherwise inaccessible by a typical user, 2) to be exchanged for material gain/sold. Please be responsible with this tool. [I](https://github.com/alexshukhman) claim zero responsibility for what you as a consumer of this code or API do with the data. Just be nice! Thanks.
