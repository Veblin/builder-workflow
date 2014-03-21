@echo off
@echo make dir

@rem 新建图片源文件 _res
mkdir _res

@rem 新建sass文件目录
mkdir scss

@rem 新建开发图片目录
mkdir images

@rem 新建目标css目录
mkdir ..\css\

@rem 新建目标html目录
mkdir ..\_html\

@rem 新建目标images目录
mkdir ..\images\

@echo dir maked

@rem 安装grunt插件
@echo npm install
npm install --save-dev
@echo npm installed

cmd