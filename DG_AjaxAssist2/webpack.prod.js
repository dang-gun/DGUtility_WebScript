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
let OutputFolder = "production";
//결과물 출력 위치
let OutputPath = path.resolve(WwwRootPath, OutputFolder);
//결과물 출력 위치 - 상대 주소
let OutputPath_relative = path.resolve("/", OutputFolder);


console.log(path.resolve(SrcPath, "DGU_AjaxAssist2"));

module.exports = merge(common, {
    /** 서비스 모드 */
    mode: 'production',
    entry: {// 빌드할 폴더 경로 지정
        app: path.resolve(SrcPath,"DGU_AjaxAssist2", "DGU_AjaxAssist2.ts"), 
    },
    output: {// 최종적으로 만들어질 js
        /** 빌드 위치 */
        path: OutputPath,
        /** 웹팩 빌드 후 최종적으로 만들어질 파일 */
        filename: "DGU_AjaxAssist2.js"
    },
});