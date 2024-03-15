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


module.exports =
{
    resolve: {
        extensions: [".js", ".ts"]
    },
};