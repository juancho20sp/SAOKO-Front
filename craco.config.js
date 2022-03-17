module.exports = {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
            @import "src/assets/styles/_colors.scss";
            @import "src/assets/styles/_borders.scss";
            @import "src/assets/styles/_fonts.scss";
            @import "src/assets/styles/_breakpoints.scss";
          `,
        },
      },
    },
  };