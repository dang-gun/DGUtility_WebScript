# visual studio Standalone Webpack + Typescript Project

## 개요
visual studio 2022에서 Webpack + Typescript로 설정된 셈플입니다.

- '.esproj'(자바스크립트 프로젝트 시스템) 템플릿으로 생성되었습니다.
- Webpack를 개발 서버(Dev Server) 및 빌더(builder)로 사용합니다.
- Typescript로 구성되어 있습니다.  
  
<br />


## 프로젝트 설정
- 포트 : 9501
- 시작 파일 : src/index.html
- 웹 어플리케이션 진입 점 : src/index.ts

<br />

- 소스 위치 : src
- 출력 위치 : dist


## 사용 방법

'독립 실행 템플릿'으로 만들려고 했는데 템플릿으로 출력하면 내용이 비어있는 현상이 있습니다.  
이 문제를 해결 할때까지는 수동으로 사용해 주세요.

1) 'Blank TypeScript Project' 프로젝트를 생성합니다.
2) 이 프로젝트에서 다음 폴더 및 파일을 복사하여 붙여 넣습니다.
	- .vscode
	- src
	- .eslintrc.cjs
	- .eslintrc.json
	- .gitignore
	- package.json
	- tsconfig.json
	- webpack.config.js
3) package.json파일을 열어 name을 프로젝트에 맞게 수정합니다.
4) .vscode/launch.json파일을 열어 프로젝트에 맞게 포트 및 설정을 수정합니다.
5) 솔류션 탐색기에서 해당 프로젝트를 오른쪽 클릭하고 속성을 선택합니다.
	시작 명령에 'npm run dev'를 넣습니다.