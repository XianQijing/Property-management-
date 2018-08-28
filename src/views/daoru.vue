<template>
	<div class="daoru">
		<h3>导入房间</h3>
		<div class="tianjia">
			<div class="input">
				<el-form ref="form" :model="form" label-width="80px" :rules="rules" >
					<el-form-item label="选择小区" style="width:100%" prop="region">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="导入设置" prop="resource">
						<el-radio-group v-model="form.resource">
							<el-radio label="重复数据不导入"></el-radio>
							<el-radio label="替换重复数据,不追加关联关系"></el-radio>
							<el-radio label="替换重复数据,追加关联关系"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="特殊资源"  prop="region">
						<el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            accept="application/vnd.ms-excel"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary" style="background:white;color:#999999;border: 1px solid #999999;">点击上传</el-button>
                            <!-- 通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置limit和on-exceed来限制上传文件的个数和定义超出限制时的行为。可通过设置before-remove来阻止文件移除操作。 -->
                            
                        </el-upload>
					</el-form-item>
				</el-form>
				
			</div>
            <div class="nn">
					<button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
				</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'daoru',
		data() {
			return {
				form: {
					name: '',
					resource: '',
					region: ''
                },
                fileList:[],
                rules: {
                    region: [
                        { required: true, message: '请选择小区', trigger: 'change' },
                    ],
                    resource: [
                        { required: true, message: '请选择导入设置', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择一个文件', trigger: 'blur' },
                    ]
                },
			}
		},
		methods: {
			goBack() {
				window.history.back()
            },
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            handleExceed(files, fileList) {
                 his.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
		}

	}
</script>

<style scoped>
	.daoru {
		position: absolute;
		background: white;
		z-index: 2000;
		width: 100%;
	}
	
	.tianjia {
		vertical-align: top;
	}
	
	.next input {
		margin-left: 20px
	}
	
	.input {
		width: 40%;
		margin: 4% 0 0 24%;
	}
	
	.nextStep {
		border-radius: 5px;
		background-color: rgb(50, 168, 238);
		width: 65px;
		height: 33px;
		border: none;
		color: white;
	}
	
	.cancel {
		border-width: 1px;
		border-color: rgb(217, 217, 217);
		border-style: solid;
		border-radius: 5px;
		background-color: rgb(255, 255, 255);
		width: 63px;
		height: 33px;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		color: rgb(138, 138, 138);
	}
	
	.nn {
		width: 20%;
		margin: 4% 0 0 40%;
		height: 1020px;
		display: flex;
		justify-content: space-between;
	}
	
	.input {
		display: block;
	}
	
	.el-radio {
		display: block;
		margin-top: 15px;
	}
	
	.el-radio+.el-radio {
		margin-left: 0!important;
	}
	
	.el-select {
		width: 100%;
	}
</style>