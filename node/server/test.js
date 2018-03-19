var fs = require('fs'); // 引入fs模块

// fs.readFile('../data/test.txt', function(err, data) {
//     // 读取文件失败/错误
//     if (err) {
//         throw err;
//     }
//     // 读取文件成功
//     console.log(data.toString());
// });


// 写入文件内容（如果文件不存在会创建一个文件）
// 写入时会先清空文件
// fs.writeFile('../data/test2.txt', 'test test', { 'flag': 'a' }, function(err) {
//     if (err) {
//         throw err;
//     }

//     console.log('Saved.');

//     // 写入成功后读取测试
//     fs.readFile('../data/test2.txt', 'utf-8', function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(data);
//     });
// });

// 打开文件
// fs.open('../data/testread.txt', 'r', function(err, fd) {
//     if (err) {
//         throw err;
//     }
//     console.log('open file success.');
//     var buffer = new Buffer(255);
//     // 读取文件
//     fs.read(fd, buffer, 0, 20, 0, function(err, bytesRead, buffer) {
//         if (err) {
//             throw err;
//         }
//         // 打印出buffer中存入的数据
//         console.log(bytesRead, buffer.slice(0, bytesRead).toString());

//         // 关闭文件
//         fs.close(fd);
//     });
// });

// 打开文件
// fs.open('../data/testwrite.txt', `w`, function(err, fd) {
//     if (err) {
//         throw err;
//     }
//     console.log('open file success.');
//     var buffer = new Buffer('shiyanlou');
//     // 读取文件
//     fs.write(fd, buffer, 0, 6, 0, function(err, bytesWritten, buffer) {
//         if (err) {
//             throw err;
//         }

//         console.log('write success.');
//         // 打印出buffer中存入的数据
//         console.log(bytesWritten, buffer.slice(0, bytesWritten).toString());

//         // 关闭文件
//         fs.close(fd);
//     });
// });

// 创建 newdir 目录
// fs.mkdir('../newdir', function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log('make dir success.');
// });

// fs.readdir('../newdir', function(err, files) {
//     if (err) {
//         throw err;
//     }
//     // files是一个数组
//     // 每个元素是此目录下的文件或文件夹的名称
//     console.log(files);
// });

// fs.watchFile('../data/test.text', (curr, prev) => {
//   console.log(`the current mtime is: ${curr.mtime}`);
//   console.log(`the previous mtime was: ${prev.mtime}`);
// });

fs.appendFile('../data/test.txt', '../data/test1.txt', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});