# Contributing
So you'd like to contribute to the Development of the Kronorium? Awesome. First thing's first, all contributions are down through Pull Requests on GitHub. This means you will create a Fork and Local Clone of the project, commit your contributions there, and then open a Pull Request. We will evaluate your contribution and merge it into Master.

## Create a Fork and Local Copy**
1. Navigate to the Master Branch of the Kronorium GitHub Repository
2. On the top right corner of your screen, you will see a Button to create a Fork
3. Download and Open the [GitHub Desktop App](https://desktop.github.com/)
4. Click the `+` in the top left corner of the screen, go to Clone, and select `YourName/Kronorium`
5. Navigate where you'd like to create your local copy, and click Clone Repository

You've now successfully created a Fork and Local Clone of the Repository. This allows you to Commit changes to your own Repository, which in turn will allow you to open a Pull Request on the main Repository to merge your Commits.

### Translators
Translators, you will have 2 required files to translate:
* [Index.html](https://github.com/dtzxporter/Kronorium/blob/master/data/en/index.html)
* [Story.json](https://github.com/dtzxporter/Kronorium/blob/master/data/en/story.json)

Simply open and edit these files from your Local Repository in your favorite Text Editors such as [Sublime Text 3](https://www.sublimetext.com/3) or [Notepad++](https://notepad-plus-plus.org/download/v7.3.3.html).

If you are not fimiliar with JSON, use [JSON Online Editor](http://www.jsoneditoronline.org/), copy and paste `Story.json` there and edit it.

Please use your corresponding Issue on the Master GitHub Repository to organize collaboration with other translators of your language. It is recommended to assign specific segments (Ex: Page 1-20 & 21-42) to different translators and merge your contributions when completed.

### Developers
All Developer contributions are welcome, however we ask that you follow some guidelines while doing so:
* Comment your code as much as possible
* Explain in-depth in your Commit description what your contributions do
* Maintain clean-organized code format

See [Run.js](https://github.com/dtzxporter/Kronorium/blob/master/scripts/run.js) for the full source, page by page with dates.

## Create a Pull Request
Once you have completed your contributions and you've commited them to your Fork, you will need to open a Pull Request on the Master Kronorium Repository.
1. Click New Pull Request
2. Click Compare Across Forks
3. Base Fork: `dtzxporter/Kronorium` Base: `Master`
4. Head Fork: `YourName/Kronorium` Base: `Master`
5. Title your Pull Request accordingly, Describe your contributions in detail
6. Create Pull Request

And you're done! You've now committed your contributions and created a Pull Request. We'll look everything over and Merge it into the Master Branch if we feel it is beneficial.

Thank you!