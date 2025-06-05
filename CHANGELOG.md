# Changelog

## 0.2.0 (2025-06-05)

### 👀 Notable Changes



#### `config`- add package import optimization and update image fetch priority 

- Introduce optimization for package imports for @ariakit/react
- Update NextImage to include fetchPriority="high" for improved loading performance
- move schema-dts dependency in package.json


Introduced in: [`ec35c50`](https://github.com/timelessco/timelessco-nextjs/commit/ec35c506b71846409d2d1cccba4abcb6eb2de690)




#### `seo`- ✨ enhance SEO with structured data & centralized config 

- Integrate structured data scripts for SEO improvement across pages
- Centralize site configuration for consistency and maintainability
- Add schema-dts dependency for structured data support
- Refactor to use constants for site info, improving DRY principle


Introduced in: [`19ff798`](https://github.com/timelessco/timelessco-nextjs/commit/19ff7984f49b81202aef82b45fe25ab7e92269d9)




#### `about-page`- done with the about page (#51) 

Co-authored-by: Navin Moorthy <navin007.a@gmail.com>


Introduced in: [`e3b1e92`](https://github.com/timelessco/timelessco-nextjs/commit/e3b1e92318f544ffc73cd29c3ef5ca405a21a638)




#### `brand-fetch`- ✨ fetch specific brand in fetchActiveBrands 

- Implement logic to retrieve a specific brand based on criteria
- Optimize data retrieval process for improved performance
- Update related tests to ensure accuracy of brand fetching


Introduced in: [`6bfbbfe`](https://github.com/timelessco/timelessco-nextjs/commit/6bfbbfeaa0055ee29018ed58dc209b13beb425be)




#### `process-page`- ✨ add ProcessPageIconGradients component 

- Introduce ProcessPageIconGradients to enhance icon gradients
- Improve visual consistency across different browsers, especially Safari
- Integrate the new component into the process page layout


Introduced in: [`9cb9e62`](https://github.com/timelessco/timelessco-nextjs/commit/9cb9e625707e5b1103b8e073fbdeeb614bd68f18)




#### `contact-page`- created the contact page (#52) 

Co-authored-by: Navin Moorthy <navin007.a@gmail.com>


Introduced in: [`edb1831`](https://github.com/timelessco/timelessco-nextjs/commit/edb1831db5f29c36d704da1f170006d067e3892e)




#### `process-page`- done with process page (#48) 

Co-authored-by: Navin Moorthy <navin007.a@gmail.com>


Introduced in: [`05266d0`](https://github.com/timelessco/timelessco-nextjs/commit/05266d028da7f4a2d51f179302c2fad9568d9483)




#### `footer`- add Footer component with link and description (#40) 

Co-authored-by: widejoy <rogerantony40@gmail.com>


Introduced in: [`ff5e35c`](https://github.com/timelessco/timelessco-nextjs/commit/ff5e35c3d86cc0ccec385c086bec438027f119f0)




#### `word-page-cards`- done with all the  cards in the work page (#38) 

Co-authored-by: Navin Moorthy <navin007.a@gmail.com>


Introduced in: [`97cfaf3`](https://github.com/timelessco/timelessco-nextjs/commit/97cfaf3fd09f1df3ea2e949e1ee8f017d56073ac)




#### `hero-section`- create the hero section and animation it on initial (#34) 

Co-authored-by: widejoy <rogerantony40@gmail.com>


Introduced in: [`c06ee22`](https://github.com/timelessco/timelessco-nextjs/commit/c06ee225db26d9fb2be7d065590b11018d5adaa7)




#### `Header`- create Header in Root Layout (#32) 

Co-authored-by: widejoy <rogerantony40@gmail.com>


Introduced in: [`8e99339`](https://github.com/timelessco/timelessco-nextjs/commit/8e993391544dd21e870096cf75273531621cecf0)





### 📌 Other Notable Changes


#### `map`- ♻️ migrate to @vis.gl/react-google-maps 

- Replace @react-google-maps/api with @vis.gl/react-google-maps
- Introduce a loading skeleton for better user experience during map loading
- Add environment variable support for custom Google Map IDs
- Update .gitignore to exclude local Claude settings
- Extend cspell.json with new terms


Introduced in: [`761e375`](https://github.com/timelessco/timelessco-nextjs/commit/761e37558fea1431755d746cf72f2ae05e4daf37)




#### `Icon`- ♻️ improve accessibility and icon handling 

- Update IconProps to make ariaLabel and name optional
- Enhance rendering logic to handle missing icon names
- Adjust StyledLink to include additional focus-visible styles


Introduced in: [`9bb1430`](https://github.com/timelessco/timelessco-nextjs/commit/9bb14306e01ba529ef4861e2cca4f0f04314a980)





### 🗃️ Commits


#### ⭐ New Features

- **`about-page:`** done with the about page ([#51](https://github.com/timelessco/timelessco-nextjs/issues/51)) - [e3b1e92](https://github.com/timelessco/timelessco-nextjs/commit/e3b1e92318f544ffc73cd29c3ef5ca405a21a638) by @widejoy

- **`brand-fetch:`** ✨ fetch specific brand in fetchActiveBrands - [6bfbbfe](https://github.com/timelessco/timelessco-nextjs/commit/6bfbbfeaa0055ee29018ed58dc209b13beb425be) by @navin-moorthy

- **`config:`** add package import optimization and update image fetch priority - [ec35c50](https://github.com/timelessco/timelessco-nextjs/commit/ec35c506b71846409d2d1cccba4abcb6eb2de690) by @navin-moorthy

- **`contact-page:`** created the contact page ([#52](https://github.com/timelessco/timelessco-nextjs/issues/52)) - [edb1831](https://github.com/timelessco/timelessco-nextjs/commit/edb1831db5f29c36d704da1f170006d067e3892e) by @widejoy

- **`contributors:`** add rogerantony to contributors list and update badge count - [cc218fa](https://github.com/timelessco/timelessco-nextjs/commit/cc218fab88601a53074b29bf4475f29b5ffaebb0) by @navin-moorthy

- **`footer:`** add Footer component with link and description ([#40](https://github.com/timelessco/timelessco-nextjs/issues/40)) - [ff5e35c](https://github.com/timelessco/timelessco-nextjs/commit/ff5e35c3d86cc0ccec385c086bec438027f119f0) by @navin-moorthy

- **`header:`** animated header onscroll ([#37](https://github.com/timelessco/timelessco-nextjs/issues/37)) - [ef82e2f](https://github.com/timelessco/timelessco-nextjs/commit/ef82e2f7102bafa7fc90311b06a9ce8b6cfd3395) by @widejoy

- **`Header:`** create Header in Root Layout ([#32](https://github.com/timelessco/timelessco-nextjs/issues/32)) - [8e99339](https://github.com/timelessco/timelessco-nextjs/commit/8e993391544dd21e870096cf75273531621cecf0) by @navin-moorthy

- **`hero-section:`** :zap: done with the hero section image ([#35](https://github.com/timelessco/timelessco-nextjs/issues/35)) - [e90affc](https://github.com/timelessco/timelessco-nextjs/commit/e90affc5bb24ff23cfb74767e961009f20f02d6b) by @widejoy

- **`hero-section:`** create the hero section and animation it on initial ([#34](https://github.com/timelessco/timelessco-nextjs/issues/34)) - [c06ee22](https://github.com/timelessco/timelessco-nextjs/commit/c06ee225db26d9fb2be7d065590b11018d5adaa7) by @navin-moorthy

- **`process-page:`** ✨ add ProcessPageIconGradients component - [9cb9e62](https://github.com/timelessco/timelessco-nextjs/commit/9cb9e625707e5b1103b8e073fbdeeb614bd68f18) by @navin-moorthy

- **`process-page:`** done with process page ([#48](https://github.com/timelessco/timelessco-nextjs/issues/48)) - [05266d0](https://github.com/timelessco/timelessco-nextjs/commit/05266d028da7f4a2d51f179302c2fad9568d9483) by @widejoy

- **`seo:`** ✨ enhance SEO with structured data & centralized config - [19ff798](https://github.com/timelessco/timelessco-nextjs/commit/19ff7984f49b81202aef82b45fe25ab7e92269d9) by @navin-moorthy

- **`testimonial-carousel:`** done with the testimonial carousel ([#39](https://github.com/timelessco/timelessco-nextjs/issues/39)) - [706a34f](https://github.com/timelessco/timelessco-nextjs/commit/706a34f888ee0105bde39650d23fb749f149dbfd) by @widejoy

- **`word-page-cards:`** done with all the  cards in the work page ([#38](https://github.com/timelessco/timelessco-nextjs/issues/38)) - [97cfaf3](https://github.com/timelessco/timelessco-nextjs/commit/97cfaf3fd09f1df3ea2e949e1ee8f017d56073ac) by @widejoy



#### 🐞 Bug Fixes

- **`page:`** add rounded corners to NextImage component for improved aesthetics - [027bc8f](https://github.com/timelessco/timelessco-nextjs/commit/027bc8f18d40bc9f3b4576ac665a2e821fc257b0) by @navin-moorthy

- **`process-page:`** update ProcessCoverImage format from PNG to JPG - [56fd69a](https://github.com/timelessco/timelessco-nextjs/commit/56fd69a14e6691f885e629a0166b81923f2d76aa) by @navin-moorthy



#### ♻️  Code Refactoring

- **`Icon:`** ♻️ improve accessibility and icon handling - [9bb1430](https://github.com/timelessco/timelessco-nextjs/commit/9bb14306e01ba529ef4861e2cca4f0f04314a980) by @navin-moorthy

- **`map:`** ♻️ migrate to [@vis](https://github.com/vis).gl/react-google-maps - [761e375](https://github.com/timelessco/timelessco-nextjs/commit/761e37558fea1431755d746cf72f2ae05e4daf37) by @navin-moorthy



#### 🔨 Maintenance Updates

- **`deps:`** 🧹 remove 'motion' dependency - [84e5164](https://github.com/timelessco/timelessco-nextjs/commit/84e516444ff782c6abea4dcc1d6da3c5ea1a9030) by @navin-moorthy

- **`deps:`** 🧹 update dependencies to latest versions - [252c6cc](https://github.com/timelessco/timelessco-nextjs/commit/252c6cc7a1b5d94c2be9c3e0235b91743889e55a) by @navin-moorthy

- **`deps:`** 🧹 update dependencies to latest versions - [24e966b](https://github.com/timelessco/timelessco-nextjs/commit/24e966ba1ab7773f3ada189e5e7f0ec5729ce61c) by @navin-moorthy

- **`deps:`** 🧹 update dependencies to latest versions ([#54](https://github.com/timelessco/timelessco-nextjs/issues/54)) - [9e163fe](https://github.com/timelessco/timelessco-nextjs/commit/9e163fea574e3e221a953ff3cbc7fd3c62049f32) by @navin-moorthy

- **`deps:`** 🧹 update Node.js engine requirement - [d1a4ab9](https://github.com/timelessco/timelessco-nextjs/commit/d1a4ab975bd00ee02fcfffd18b332841c4d4517d) by @navin-moorthy

- **`deps:`** update all dependencies ([#53](https://github.com/timelessco/timelessco-nextjs/issues/53)) - [e7af63d](https://github.com/timelessco/timelessco-nextjs/commit/e7af63db5dbb51ad9c9c4eb1d223397cd622b3aa) by @renovate[bot]

- **`deps:`** update dependencies including sentry, motion, eslint plugins and pnpm - [2cf0b97](https://github.com/timelessco/timelessco-nextjs/commit/2cf0b97f3ba0db9a27261ae2a3b59a8550e45a17) by @navin-moorthy

- **`images:`** update about-hero-cover image to new JPG format - [12b743f](https://github.com/timelessco/timelessco-nextjs/commit/12b743f5f0f576f148f0662a30f7345490e975ba) by @navin-moorthy

- **`seo:`** 🧹 update project name from "Next TS App" to "Timeless Co" - [afbe51f](https://github.com/timelessco/timelessco-nextjs/commit/afbe51fe30d7ca18ccf153a50a977275faa6ecf2) by @navin-moorthy

## 0.1.0 (2025-03-26)

### 👀 Notable Changes



#### `repo`- 🚀 v1 commit (#2) 

* refactor(config): update serverExternalPackages and clean up DEVELOPMENT.md


Introduced in: [`83b61a4`](https://github.com/timelessco/timelessco-nextjs/commit/83b61a457e7d13031aa24905bf7551e5fa11b962)





### 🗃️ Commits


#### ⭐ New Features

- **`repo:`** 🚀 v1 commit ([#2](https://github.com/timelessco/timelessco-nextjs/issues/2)) - [83b61a4](https://github.com/timelessco/timelessco-nextjs/commit/83b61a457e7d13031aa24905bf7551e5fa11b962) by @navin-moorthy




- added 2 placeholder images - [8b2b297](https://github.com/timelessco/timelessco-nextjs/commit/8b2b297b5788608c653e0181de4d4c5f192a35f3) by @widejoy

- added a small animation and removed onclicks to be replaced by a tag ot links - [27b0a19](https://github.com/timelessco/timelessco-nextjs/commit/27b0a19401f60e32819daf87a2c888879ac91cec) by @widejoy

- added camera control to google maps api - [4aba83a](https://github.com/timelessco/timelessco-nextjs/commit/4aba83a6781a6f229e5227891ccb38ae90c300b4) by @widejoy

- added compressed versions of images - [955db21](https://github.com/timelessco/timelessco-nextjs/commit/955db2195d027d0e036d28366fe390c910b0f0f7) by @widejoy

- added google map controls for street view, cleaned up the console - [9792291](https://github.com/timelessco/timelessco-nextjs/commit/9792291c21972f0981fe3b9b8e15ba72a9218c08) by @widejoy

- added link tag to a button - [3630dbd](https://github.com/timelessco/timelessco-nextjs/commit/3630dbd401675ade295acef064df0631d6c85c2e) by @widejoy

- added navigation to proper tabs when clicked - [765a1f2](https://github.com/timelessco/timelessco-nextjs/commit/765a1f2807ce52d86ed1347506b5cd955c0ba21b) by @widejoy

- added the animation - [865c6fe](https://github.com/timelessco/timelessco-nextjs/commit/865c6fe1b02ca081a8b5696e356aad65a184df1c) by @widejoy

- added the carousel animation - [9dca738](https://github.com/timelessco/timelessco-nextjs/commit/9dca738b54cd1139a3e07388076dd94d08d85ec8) by @widejoy

- changed a small font size difference - [62129bf](https://github.com/timelessco/timelessco-nextjs/commit/62129bf8412deaa7ec7709ace642b2bc8bb8e3ab) by @widejoy

- changed line height config - [7dd37a9](https://github.com/timelessco/timelessco-nextjs/commit/7dd37a9d7e2f0f0f341e92a0e05e6683c23e6359) by @widejoy

- changed placeholder images - [a065a6f](https://github.com/timelessco/timelessco-nextjs/commit/a065a6f9618c147cff872a87c956ce75798991ea) by @widejoy

- changed the links - [f3bf6fb](https://github.com/timelessco/timelessco-nextjs/commit/f3bf6fb05eaf0afa0ff22353a3679da68f136292) by @widejoy

- did tailwind default styles instead of arbitary styles - [85442df](https://github.com/timelessco/timelessco-nextjs/commit/85442df74bd6b68d95257df1bb4c52af49bc2f71) by @widejoy

- done with the contact page - [2950655](https://github.com/timelessco/timelessco-nextjs/commit/29506555a755a16c5f9e0843541edf22eda168be) by @widejoy

- done with the entire page - [0022858](https://github.com/timelessco/timelessco-nextjs/commit/0022858c8adcbb6eed62ea3c67b659a6b2a42937) by @widejoy

- done with the first page - [181ac45](https://github.com/timelessco/timelessco-nextjs/commit/181ac45a53c3a10f1960a957aa1c13121a202b6a) by @widejoy

- done with the header - [497f1f7](https://github.com/timelessco/timelessco-nextjs/commit/497f1f7e0f0b7b423d279868caf264d39638c1bf) by @widejoy

- done with the last page expt animation - [16b3430](https://github.com/timelessco/timelessco-nextjs/commit/16b3430d33fa43c2702fc4eafc7b9345dfe7f8d3) by @widejoy

- done with the process page as well - [7f03de1](https://github.com/timelessco/timelessco-nextjs/commit/7f03de1fda32dba91ad555f0818b72be002fa66d) by @widejoy

- done with the tablet ui (images) - [a37b6f9](https://github.com/timelessco/timelessco-nextjs/commit/a37b6f972882edce469b9bdbed7cf55df4e5d97b) by @widejoy

- fixed a small bug - [f44f289](https://github.com/timelessco/timelessco-nextjs/commit/f44f2899247a2a23ca13bfdb2eb92df5e7b03f36) by @widejoy

- fixed a small bug with a image and made logo into a seperate component - [2233a4f](https://github.com/timelessco/timelessco-nextjs/commit/2233a4f7dccbdcc48dc0eb5cc2a0fe573390711d) by @widejoy

- fixed a small build error - [0b44772](https://github.com/timelessco/timelessco-nextjs/commit/0b4477281defd568db8e832349a44f453291242c) by @widejoy

- fixed a small font bug - [aa18c08](https://github.com/timelessco/timelessco-nextjs/commit/aa18c08501e92935472575e4cee0af71ad1f55f7) by @widejoy

- fixed some padding issues - [734f0de](https://github.com/timelessco/timelessco-nextjs/commit/734f0de0a3f2352ec35a679e464ebddad0f4a650) by @widejoy

- fixed some small ui related typos - [1910ed3](https://github.com/timelessco/timelessco-nextjs/commit/1910ed333b3bbc99b308ed6b3ab687ccfc38329c) by @widejoy

- fixed some visual bugs - [fd49da1](https://github.com/timelessco/timelessco-nextjs/commit/fd49da1b59c183736a33a958daf75f4d9d1e04ed) by @widejoy

- fixed text color and added mobile responsivity over the carousel - [a9d3a06](https://github.com/timelessco/timelessco-nextjs/commit/a9d3a06affb43dfae2818afed296c08f53656e33) by @widejoy

- fixed the arrow misplacement bug - [755cf43](https://github.com/timelessco/timelessco-nextjs/commit/755cf43edb85a3fc74718924634a3738a62b20a3) by @widejoy

- Initial commit from Create Next App - [2e8860f](https://github.com/timelessco/timelessco-nextjs/commit/2e8860ffa36e164ab9a07de860d6b745621a6e33)

- loading equitan sans locally instead of a network request - [24f9d76](https://github.com/timelessco/timelessco-nextjs/commit/24f9d769811322e7676b942f42ec3963508ce31b) by @widejoy

- made more components pixel perfect - [1ad7c14](https://github.com/timelessco/timelessco-nextjs/commit/1ad7c14622505a80d7374923854abac586660e32) by @widejoy

- made the animation of the carousel proper - [09e9d46](https://github.com/timelessco/timelessco-nextjs/commit/09e9d46b80722e40dfa10d9a7628f35819c22264) by @widejoy

- made the first page - [7fef31c](https://github.com/timelessco/timelessco-nextjs/commit/7fef31cfec3525be59289eced7e103d2da6e4f8d) by @widejoy

- made the first page - [9ebafee](https://github.com/timelessco/timelessco-nextjs/commit/9ebafee1d39d8dfc5430f283d3d556d997c44ec5) by @widejoy

- made the tablet ui as well - [755ab49](https://github.com/timelessco/timelessco-nextjs/commit/755ab49dbc501d21a3b9f3688fc2bb943e69ed81) by @widejoy

- moved animated section to a seperate component - [7f363a2](https://github.com/timelessco/timelessco-nextjs/commit/7f363a2262f7f15d0c0ed56a8a51e6e20ffaa442) by @widejoy

- pre-final ui - [9f35542](https://github.com/timelessco/timelessco-nextjs/commit/9f355422aa63d4f549bf6818f182832c47e827bf) by @widejoy

- removed current implementation of animation and used semantic html for the first page - [e560c20](https://github.com/timelessco/timelessco-nextjs/commit/e560c209fbf1229e378eee6c5ed3efca17035f85) by @widejoy

- removed zooom control from google maps - [afcd487](https://github.com/timelessco/timelessco-nextjs/commit/afcd4878c38c5b961fd1d68533ac5eb03beaeb2f) by @widejoy

- some improvements regarding readability and performance - [8487f32](https://github.com/timelessco/timelessco-nextjs/commit/8487f32b6147153cd0264ad42e91ea481072a51d) by @widejoy

- Update README.md - [0f2ca34](https://github.com/timelessco/timelessco-nextjs/commit/0f2ca342b9db8eb3757e8a651f2782ac80d52d1b) by @navin-moorthy
