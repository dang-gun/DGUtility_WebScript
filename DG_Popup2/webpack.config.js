const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

// 소스 위치

/** 루트 위치 */
const RootPath = path.resolve(__dirname);
/** src 폴더 위치 */
const SrcPath = path.resolve(RootPath, 'src');

// 빌드 위치

/** 필드 폴더 이름 */
const BuildFolderName = 'build';
/** 필드 폴더 위치 */
const BuildPath = path.resolve(__dirname, BuildFolderName);

// html 템플릿 위치

/** index.html 파일 위치 */
const IndexHtmlPath = path.resolve(SrcPath, 'index.html');

// 결과물 출력 위치

/** 결과물 출력 위치 */
const OutputPath = BuildPath;
/** 결과물 출력 위치 - 상대 주소 */
const OutputPathRelative = path.resolve("/", BuildFolderName);

module.exports = (env, argv) =>
{
    return {
        mode: "production",
        devtool: "eval",
        resolve: { extensions: ['.js', '.ts'] },
        // 최종적으로 만들어질 js 파일
        output: {
            /** 빌드 위치 */
            path: OutputPath,
            /** 빌드 후 최종적으로 만들어질 파일 */
            filename: 'DG_Popup2.js',
            publicPath: "/"
        },
        module: {
            // 모듈 규칙
            rules: [
                // TypeScript 로더
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['ts-loader']
                }
            ]
        },
        plugins: [
            // 결과물을 담을 폴더를 먼저 지운다.
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    "**/*",
                    "!robots.txt",
                    "!Upload"
                ]
            }),

            // index.html 파일을 빌드 폴더에 복사한다.
            new HtmlWebpackPlugin({ template: IndexHtmlPath })
        ],
        devServer: {
            /** 서비스 포트 */
            port: "4065",
            /** 결과물이 위치할 폴더 */
            static: [path.resolve("./", "build")],
            /** 브라우저 오픈 여부 */
            open: true,
            /** 핫 리로드 사용 여부 */
            hot: true,
            /** 라이브 리로드 사용 여부 */
            liveReload: true,
        }
    };
}