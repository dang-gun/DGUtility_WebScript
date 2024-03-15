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
const WwwRoot = "build";
//�������� ����ϴ� ���� ��ġ
const WwwRootPath = path.resolve(__dirname, WwwRoot);

//���ø� ��ġ
const IndexHtmlPath = path.resolve(SrcPath, "index.html");
//const IndexHtmlPath = path.resolve(SrcPath, "test01.html");
//����� ��� ���� �̸�
let OutputFolder = "development";
//����� ��� ��ġ
let OutputPath = path.resolve(WwwRootPath, OutputFolder);
//����� ��� ��ġ - ��� �ּ�
let OutputPath_relative = path.resolve("/", OutputFolder);


module.exports = merge(common, {
    /** ���� ��� */
    mode: 'development',
    devtool: 'inline-source-map',
    output: {// ���������� ������� js
        /** ���� ��ġ */
        path: OutputPath,
        /** ���� ���� �� ���������� ������� ���� */
        filename: "app.js"
    },

    plugins: [
        // ������ �����(��>��������)�� HTML�� �������ִ� �÷�����
        new HtmlWebpackPlugin({ template: IndexHtmlPath }),
        // ��������� ����ִ� �÷�����
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                "!robots.txt",
                "!Upload"
            ]
        }),

        //�״�� ��������� ������ ���� ����
        new CopyPlugin({
            patterns: [
                {
                    //��� html���� ����
                    from: "./src/**/*.html",
                    to({ context, absoluteFilename })
                    {
                        //'src/'�� ����
                        let sOutDir = path.relative(context, absoluteFilename).substring(4);
                        //index.html�� ����Ʈ�� �������ֹǷ� ���⼱ ��ŵ�Ѵ�.
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
        /** ���� ��Ʈ */
        port: "9501",
        /** ��������� ��ġ */
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

            // ���⿡ ���ϴ� �̵��� �߰��ϼ���
            middlewares.push(
                (req, res, next) =>
                {
                    // ����: /api/keywords ��η� ������ ��û�� ���� ��� ������ ��ȯ
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
                        // �ٸ� ��û�� ���� �̵����� ����
                        next();
                    }
                }
            );

            return middlewares;
        },

        /** ������ ���� ���� */
        //open: true,
        /** �ָ��ε� ��뿩�� */
        hot: true,
        /** ���̺� ���ε� ��뿩�� */
        liveReload: true
    },
});