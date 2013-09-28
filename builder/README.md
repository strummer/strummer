builder
=======

_Note: This is a throwaway directory to start the discussion. Please re-arrange into the proper place in the codebase when applicable._

Builder is a web-based tool that gives you instant feedback on your app as you build it. Think of it like your on-site helper to make sure you aren't breaking everything.


# Getting Started

To access Builder, hit '~' (like the Quake console!) or click on the icon that appears for signed-in users with the 'Admin' flag set.


# Installation

To run the Builder prototype, you need to setup NodeJS (static server) and Karma (test runner).

### Install NodeJS

Follow the instructions at: http://nodejs.org/

### Install depdendencies

1. Open the Builder directory in your terminal: `cd ./builder`
2. Run npm install to install basic dependencies: `npm install`

## Contributing

To install tests or start hacking on Builder, visit the [Contributing](docs/contributing.md) page.


# Features

## View your Structures

This is what your data looks like based on your current changes to your HTML. Browse through the data structures you've created and discover the variables and information you have access to on each page.

![Builder - Settings](wireframes/builder-structures.png?raw=true)

### 'Ipsum' Mode

Want to see what your new layout would look like with some sample data? Turn on 'Ipsum' Mode and we'll populate your page with random length dummy data that meets your specifications.

Click **Randomize** to mix up the lengths and data so you can get an idea what a variety of content would look like.

## Preview and Publish

Swap between your current site and your proposed changes. Make sure everything looks a-ok then hit Publish to push your changes live immediately.

## Settings

Update your settings for your site such as Domain Name.

![Builder - Settings](wireframes/builder-settings-success.png?raw=true)
