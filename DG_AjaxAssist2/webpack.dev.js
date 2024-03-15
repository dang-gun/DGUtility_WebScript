const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

//소스 위치
const RootPath = path.resolve(__dirname);
const SrcPath = path.resolve(RootPath, "src");

//웹서버가 사용하는 폴더 이름
const WwwRoot = "build";
//웹서버가 사용하는 폴더 위치
const WwwRootPath = path.resolve(__dirname, WwwRoot);

//템플릿 위치
const IndexHtmlPath = path.resolve(SrcPath, "index.html");
//const IndexHtmlPath = path.resolve(SrcPath, "test01.html");
//결과물 출력 폴더 이름
let OutputFolder = "development";
//결과물 출력 위치
let OutputPath = path.resolve(WwwRootPath, OutputFolder);
//결과물 출력 위치 - 상대 주소
let OutputPath_relative = path.resolve("/", OutputFolder);


module.exports = merge(common, {
    /** 서비스 모드 */
    mode: 'development',
    devtool: 'inline-source-map',
    output: {// 최종적으로 만들어질 js
        /** 빌드 위치 */
        path: OutputPath,
        /** 웹팩 빌드 후 최종적으로 만들어질 파일 */
        filename: "app.js"
    },

    plugins: [
        // 빌드한 결과물(예>번들파일)을 HTML에 삽입해주는 플러그인
        new HtmlWebpackPlugin({ template: IndexHtmlPath }),
        // 출력폴더를 비워주는 플러그인
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                "!robots.txt",
                "!Upload"
            ]
        }),

        //그대로 출력폴더에 복사할 파일 지정
        new CopyPlugin({
            patterns: [
                {
                    //모든 html파일 복사
                    from: "./src/**/*.html",
                    to({ context, absoluteFilename })
                    {
                        //'src/'를 제거
                        let sOutDir = path.relative(context, absoluteFilename).substring(4);
                        //index.html은 리액트가 생성해주므로 여기선 스킵한다.
                        if ("index.html" === sOutDir)
                        {
                            //sOutDir = "index_Temp.html";
                            sOutDir = "";
                        }
                        //console.log("sOutDir : " + sOutDir);
                        return `${sOutDir}`;
                    },
                },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],


    devServer: {
        /** 서비스 포트 */
        port: "9501",
        /** 출력파일의 위치 */
        static: [
            path.resolve("./", "build/development/"),
            {
                directory: path.resolve(RootPath, "public"),
                publicPath: '/public',
            },

        ],


        setupMiddlewares: (middlewares, devServer) =>
        {
            if (!devServer)
            {
                throw new Error('webpack-dev-server is not defined');
            }

            // 여기에 원하는 미들웨어를 추가하세요
            middlewares.push(
                (req, res, next) =>
                {
                    // 예시: /api/keywords 경로로 들어오는 요청에 대한 목업 데이터 반환
                    if (req.url === '/api/keywords')
                    {
                        res.json([
                            { keyword: 'apple' },
                            { keyword: 'banana' },
                            { keyword: 'carrot' },
                            { keyword: 'grape' }
                        ]);
                    } else
                    {
                        // 다른 요청은 다음 미들웨어로 전달
                        next();
                    }
                }
            );

            return middlewares;
        },

        /** 브라우저 열지 여부 */
        //open: true,
        /** 핫리로드 사용여부 */
        hot: true,
        /** 라이브 리로드 사용여부 */
        liveReload: true
    },
});