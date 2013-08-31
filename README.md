strummer
========

We believe that developers shouldn't be the only ones that can build great web apps.

Strummer is a framework for designers to build web apps using simple HTML commands. You worry about the View, we'll take care of the rest.

Bootstrap allows engineers to build without designers, what would Bootstrap for designers look like?


# Getting Started

To access Builder, hit '~' (like the Quake console!) or click on the icon that appears for signed-in users with the 'Admin' flag set.



# Features

## It's just HTML

Write HTML just like you normally would. Strummer doesn’t require that you learn a new language or any crazy new software. Instead, we augment the HTML you’re used to writing with a some helpful commands and options.

**Example**
````
<ol object="shots" sort="favorites" time="24h" order="desc">
  <li object="shot" class="three columns">
    <img object="thumbnail" />
    <a object="attachment" />
    <div class="stats">
      <p object="views" />
      <p object="comments" />
      <p object="likes" />
    </div>
    <div object="author">
      <img object="thumbnail" />
      <a href="name" />
    </div>
  </li>
</ol>
````

**Output**

![Example Shot](http://cl.ly/image/291G2h0P0r0R/Screen%20Shot%202013-08-31%20at%2010.09.40%20AM.png)

## Builder

Builder is a web-based tool that gives you instant feedback on your app as you build it. Think of it like your on-site helper to make sure you aren't breaking everything.

[Builder Documentation](https://github.com/strummer/strummer/blob/builder/builder/README.md)

## CMS

Strummer's CMS is auto-generated from your HTML and allows you to manage and update your content and data.


# License

Strummer is licensed under the _To Be Determined_ License.


# Contributors

[j2labs](http://github.com/j2labs)
[bdickason](http://github.com/bdickason)

Want to contribute? Just open the [Issues Tab](https://github.com/strummer/strummer/issues) and start hacking!
