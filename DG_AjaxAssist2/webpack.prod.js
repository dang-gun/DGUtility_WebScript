const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

//�ҽ� ��ġ
const RootPath = path.resolve(__dirname);
const SrcPath = path.resolve(RootPath, "src");

//�������� ����ϴ� ���� �̸�
const WwwRoot = "dist";
//�������� ����ϴ� ���� ��ġ
const WwwRootPath = path.resolve(__dirname, WwwRoot);

//���ø� ��ġ
const IndexHtmlPath = path.resolve(SrcPath, "index.html");
//const IndexHtmlPath = path.resolve(SrcPath, "test01.html");
//����� ��� ���� �̸�
let OutputFolder = "production";
//����� ��� ��ġ
let OutputPath = path.resolve(WwwRootPath, OutputFolder);
//����� ��� ��ġ - ��� �ּ�
let OutputPath_relative = path.resolve("/", OutputFolder);

//tsconfig��ġ
let tsconfig = path.resolve(RootPath, "tsconfig.prod.json");
console.log("tsconfig.prod.json => " + tsconfig);

module.exports = merge(common, {
    /** ���� ��� */
    mode: 'production',
    entry: {// ������ ��� ����
        app: path.resolve(SrcPath,"DGU_AjaxAssist2", "DGU_AjaxAssist2.ts"), 
    },
    output: {// ���������� ������� js
        /** ���� ��ġ */
        path: OutputPath,
        /** ���� ���� �� ���������� ������� ���� */
        filename: "DGU_AjaxAssist2.js"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        exclude: /node_modules/,
                        options: {
                            configFile: tsconfig // ���⿡ ���ϴ� ���� ��θ� ����
                        }
                    }
                ]
            }
        ]
    },
    
});