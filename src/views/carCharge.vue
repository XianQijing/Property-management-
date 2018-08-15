<template>
	<!--车位管理-添加车位-->
	<div class="carCharge">
		<h3>添加收费标准</h3>
		<div class="tianjia">
			<div class="input">
				<el-form :model="carChargeForm" :rules="rules" ref="carChargeForm" label-width="130px" class="demo-carChargeForm">
					<el-form-item label="车位:" prop="car" class="chewei">
						<el-input v-model="carChargeForm.car"></el-input>
					</el-form-item>
					<el-form-item label="保存设置:" prop="radio">
						<el-radio v-model="carChargeForm.radio" label="1">备选项</el-radio>
						<el-radio v-model="carChargeForm.radio" label="2">备选项</el-radio>
						<span style="color:#D9DCE2">批量删除是指删除所选车位所有的收费标准，并添加下面的收费标准</span>
					</el-form-item>
					<el-form-item label="收费标准:" prop="car">
						<el-table :data="biaoge" style="width: 100%">
							<el-table-column prop="charge" label="收费项目/收费标准" width="160"></el-table-column>
							<el-table-column prop="start" label="开始时间" width="100"></el-table-column>
							<el-table-column prop="end" label="结束时间" width="100"></el-table-column>
							<el-table-column prop="money" label="手动输入金额" width="160"></el-table-column>
							<el-table-column prop="remarks" label="备注"></el-table-column>
						</el-table>
					</el-form-item>
				</el-form>

                <!--导入弹窗-->
		<el-button type="text" @click="dialogVisible = true" class="mm">添加收费标准</el-button>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" modal:false :before-close="handleClose">
			<div class="shuru">
                <el-form :model="charge" :rules="rules" ref="charge" label-width="130px" class="demo-charge">
                    <el-form-item label="收费项目/收费标准">
                    <el-select v-model="charge.charge" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
					</el-select>
                    </el-form-item>
                    <el-form-item label="起始时间">
                        <el-time-select placeholder="起始时间" v-model="charge.start" :picker-options="{start: '08:30', step: '00:15', end: '18:30'}"></el-time-select>{{charge.start}}
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-time-select placeholder="结束时间"  v-model="charge.endTime" :picker-options="{start: '08:30',  step: '00:15', end: '18:30', minTime: charge.start}"></el-time-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                <el-input v-model="charge.remarks" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                </el-form>
            </div>

			<span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
		</el-dialog>
			</div>
			<div class="nn">
				<button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'carCharge',
		data() {
			return {
				carChargeForm: {
					car: '',
					radio: '1'
				},
				dialogVisible: false,
				charge: {
					charge: '',
					start: '',
					end: '',
					money: '',
					remarks: ''
                },
                biaoge:[],
				rules: {
					charge: [
						{ required: true, message: '请选择收费项目/收费标准', trigger: 'blur' },
					],
					start: [
						{ required: true, message: '请选择起始时间', trigger: 'change' }
					],
					end: [
						{ required: true, message: '请输', trigger: 'blur' }
					],
					buildArea: [
						{ required: true, message: '请输入建筑面积', trigger: 'blur' }
					]
				},
			}
		},

		methods: {
			goBack() {
				window.history.back()
			}
		}

	}
</script>

<style scoped>
	.carCharge {
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
		width: 80%;
		margin: 4% 0 0 18%;
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
		display: flex;
		justify-content: space-between;
	}
	
	.el-radio {
		display: block;
		margin-top: 15px;
	}
	
	.el-radio+.el-radio {
		margin-left: 0!important;
	}

    .chewei {
        width: 50%!important;
    }

    .mm {
        width: 79%;
        border: 1px dashed #47C479;
        color: #47C479
    }
	.el-form-item__content {
		width: 80%;
	}
	.el-form-item__content{
		width: 70%;
	}
</style>