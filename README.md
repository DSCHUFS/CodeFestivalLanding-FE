# HUFS CodeFestival

<img src="https://codefestival.hufs.ac.kr/static/images/og_image.png" width="100%" height="auto" alt="CodeFestival"/>

Welcome to the web frontend repository for the 2024-2025 Hankuk University of Foreign Studies (HUFS) Code Festival. This
repository includes the code for the landing page, competition archive, and other festival features.

## Features

- **Landing Page for Registration**: A dedicated page for participants to sign up for the Code Festival.
- **Competition Details**: Detailed event information, such as schedules, categories, and judging criteria.
- **FAQ Page**: Answers to common questions to help participants navigate the event smoothly.
- **Gallery**: A section showcasing event highlights, previous competitions, and participant achievements, providing a
  glimpse into the Code Festival experience.

These pages leverage Next.js's `Intercepting Routes` and `Parallel Routes`, allowing for greater flexibility in
navigation and page rendering. This architecture ensures that users experience seamless transitions and efficient data
loading across the platform.

## Tech Stack

<table>
  <th>Category</th>
  <th>Stack</th>
  <tr>
    <td align="center"><b>common</b></td>
    <td>
      <img src="https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/ESLint-482EBF?style=flat&logo=eslint&logoColor=white" alt="ESLint" />
      <img src="https://img.shields.io/badge/Prettier-ff69b4?style=flat&logo=Prettier&logoColor=white" alt="Prettier" />
      <img src="https://img.shields.io/badge/Pnpm-F69220?style=flat&logo=pnpm&logoColor=white" alt="Pnpm" />
       </td>
  </tr>
  <tr>
    <td align="center"><b>frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=React&logoColor=%2361DAFB" alt="React" />
      <img src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" alt="Next.js" />
      <img src="https://img.shields.io/badge/Vanilla%20Extract-99f6e4.svg?style=flat&logo=data:image/png;base64,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&logoColor=white" alt="Vanilla Extract" />
      <img src="https://img.shields.io/badge/Three.js-000000?style=flat&logo=Three.js&logoColor=white" alt="Three.js" />
      </td>
  </tr>
  <tr>
    <td align="center"><b>CI</b></td>
    <td>
      <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=GitHub%20Actions&logoColor=white" alt="GitHub Actions" >
    </td>
  </tr>
  <tr>
    <td align="center"><b>deployment</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vercel-black?style=flat&logo=Vercel&logoColor=white" alt="Vercel" />
    </td>
  </tr>
</table>

## Getting Started

### Project Setup

1. Clone the repository:

```bash
   git clone https://github.com/GDGHUFS/CodeFestival-Web.git
```

2. Install the dependencies:

if you are not installed pnpm, install it first: `npm install -g pnpm`

```bash
   pnpm install
```

3. Start the development server:

```bash
  pnpm dev
```

### Competition Setup

Competition metadata and registration periods are managed by the CodeFestival API instead of a hard-coded frontend
constant.

1. Create an MDX file in `content/histories`. Use the competition edition as the filename, such as `7.mdx`.
2. Add the competition details to the MDX file and verify that `/festival/{edition}` renders correctly.
3. Open `/admin`, authenticate with an administrator account, and create a competition using the same edition.
4. Configure its title, privacy policy, registration period, event date, and active status.

The active competition is automatically reflected in the landing page, header, and application page. Activating a new
competition deactivates the previously active competition, while its MDX page remains available as part of the
competition history.

### FAQ Page Content

If you need to update the content of the FAQ page, update the `src/constants/faq.ts` file.

## License

This project is distributed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## Contact

If you have any questions, feel free to reach out via [Issues](https://github.com/GDGHUFS/CodeFestival-Web/issues) or
contact me directly at [me@haklee.me](mailto:me@haklee.me).
