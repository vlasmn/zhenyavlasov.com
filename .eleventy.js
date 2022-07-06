const markdownIt = require('markdown-it');
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw") {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let imageSrc = `${path.dirname(this.page.inputPath)}/${src}`;

  let metadata = await Image(imageSrc, {
    widths: [320, 640, 960, 1200, 1800],
    formats: ['webp', 'jpeg'],
    outputDir: path.dirname(this.page.outputPath),
    urlPath: this.page.url,
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="slider__slide">
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="sync"
        class="slider__image">
    </picture>`;
};

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

        config.addNunjucksAsyncShortcode("image", imageShortcode);
        config.addLiquidShortcode("image", imageShortcode);
        config.addJavaScriptFunction("image", imageShortcode);

        config.addLayoutAlias('default', 'layouts/base.njk');

        config.addPassthroughCopy("src/images");
        config.addPassthroughCopy("src/fonts");
        config.addPassthroughCopy("src/scripts");
        config.addPassthroughCopy("src/cv-vlasov.pdf");
        config.addPassthroughCopy("src/manifest.json");
        config.addPassthroughCopy("src/CNAME");

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
