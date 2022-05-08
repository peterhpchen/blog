module.exports = {
  base: '/blog/',
  title: 'Limitless Ping', // Title for the site. This will be displayed in the navbar.
  theme: '@vuepress/theme-blog',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/peterhpchen'
        },
        {
          type: 'linkedin',
          link: 'https://www.linkedin.com/in/peter-hsin-ping-chen/'
        }
      ],
      copyright: [
        {
          text: 'Copyright © 2014-present Peter Chen',
        },
      ],
    },
    feed: {
      canonical_base:'https://peterhpchen.github.io',
    }
  }
}
