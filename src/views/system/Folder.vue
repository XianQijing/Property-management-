<template>
  <div class="folder">
    <el-button class="upload" size="small">
      <input type="file" name="file" webkitdirectory @change="fileFolder($event)">上传
    </el-button>
    <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="fileName" label="文件名" align="center" width="180">
        <template slot-scope="scope">
          <img src="../../assets/img/folder.png" style="vertical-align:middle;" alt="">
          {{ scope.row.fileName }}
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="上传者" width="180"></el-table-column>
      <el-table-column prop="createTime" label="上传时间" sortable ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="omit(scope.row.id)">删除</el-button>
          <el-button type="text" @click="down(scope.row.id)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import '../../js/jszip.js'
import url from '../../assets/Req.js'
export default {
  name: 'Folder',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    down (id) {
      window.location.href = url + 'file/downloadFile?id=' + id
    },
    getData () {
      this.$ajax.get(url + 'file/show').then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    },
    fileFolder (e) {
      // console.log(e.target.files)
      //文件读取成功 将文件打包成zip
      let that = this
      var file = e.target
      // console.log(e.target.files[0].webkitRelativePath.split('/')[0])
		 
		  var zip = new JSZip()
		  
		  //添加需要压缩的文件 file对象
		  zip.file(file.files[0].name, file.files[0])
      zip.file("mimetype", "application/zip")
		  // console.log(zip)
		  //return promise对象
		  zip.generateAsync({type:'Blob',compression: 'DEFLATE'}).then(function(content) {
        
        // //第一种方法
        // //创建file对象
        var fils = new File([content], e.target.files[0].webkitRelativePath.split('/')[0] + '.zip',{type: "zip"});
        // console.log(fils)
        if (fils.size > 20 * 1024) {
          that.$message.error('文件夹过大，请重新选择文件夹')
        } else {
          var formData = new FormData()
          formData.append("file",fils)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          that.$ajax.post(url + 'file/uploadFile', formData, config).then(res => {
            // console.log(res)
            if (res.data.status === 200) {
              that.$message.success('上传成功')
              that.getData()
            } else {
              that.$message('上传失败')
            }
          })
        }
		  })
    },
    // 删除
    omit (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$ajax.get(url + 'file/deleteFile', {
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData()
          } else {
            that.$message('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatter (row, column) {
      return row.address
    }
  }
}
</script>

<style lang="less" scoped>
.folder {
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  margin-right: 2px;
  height: 805px;
  min-width: 1250px;
  .upload {
    float: right;
    width:80px;
    // height:16px;
    background:rgba(255,148,148,1);
    border-radius:4px;
    color: #fff;
    border-color: #fff;
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
