const markdownIt = require('markdown-it');
const Image = require("@11ty/eleventy-img");

module.exports = function (config) {
        config.addCollection("postsByYear", (collection) => {
        const posts = collection.getFilteredByTag('post').reverse();
        const years = posts.map(post => post.date.getFullYear());
        const uniqueYears = [...new Set(years)];
        const postsByYear = uniqueYears.reduce((prev, year) => {
        const filteredPosts = posts.filter(post => post.date.getFullYear() === year);
        return [
            ...prev,
            [year, filteredPosts]
        ]
        }, []);
        return postsByYear;
        });

        config.addPairedShortcode("markdownIt", (content) => {
            return md.render(content);
        });

        config.addNunjucksAsyncShortcode("Image", async (src, alt) => {
            if (!alt) {
              throw new Error(`Missing \`alt\` on myImage from: ${src}`);
            }

            let stats = await Image(src, {
              widths: [25, 320, 640, 960, 1200, 1800, 2400],
              formats: ["jpeg", "webp"],
              urlPath: "/images/",
              outputDir: "./dist/images/",
            });

            let lowestSrc = stats["jpeg"][0];

            const srcset = Object.keys(stats).reduce(
              (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                  (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                  ""
                ),
              }),
              {}
            );

            const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;

            const img = `<img
              alt="${alt}"
              src="${lowestSrc.url}"
              sizes='(min-width: 1024px) 1024px, 100vw'
              srcset="${srcset["jpeg"]}"
              width="${lowestSrc.width}"
              height="${lowestSrc.height}">`;

            return `<picture class="slider__image"> ${source} ${img} </picture>`;
        });

        config.addLayoutAlias('default', 'layouts/base.njk');

        config.addPassthroughCopy("src/images");
        config.addPassthroughCopy("src/fonts");
        config.addPassthroughCopy("src/scripts");
        config.addPassthroughCopy("src/manifest.json");
        config.addPassthroughCopy("src/*.pdf");

        return {
            dir: {
                input: 'src',
                output: 'dist',
                includes: 'includes',
                layouts: 'layouts',
                data: 'data',
            },
            dataTemplateEngine: 'njk',
            markdownTemplateEngine: false,
            htmlTemplateEngine: 'njk',
            passthroughFileCopy: true,
            templateFormats: ['md', 'njk'],
        };
    };
