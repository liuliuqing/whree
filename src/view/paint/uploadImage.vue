<template>
	    <div>
		        <Row>
			            
			<Col>
			                <Card>
				                    <div class="demo-upload-list" v-for="item in uploadList">
					                        <template v-if="item.status === 'finished'">
						                            <img :src="item.url">
						                            <div class="demo-upload-list-cover">
							                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
							                                <Icon type="ios-download-outline" @click.native="handleDown(item)"></Icon>
							                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							                            </div>
						                        </template>
					                        <template v-else>
						                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						                        </template>
					                    </div>
				                    <div :style="pStyle">
					                     <Upload ref="upload"                              :show-upload-list="false"
					 :default-file-list="defaultList"                              :on-success="handleSuccess" :format="['jpg','jpeg','png']"
					                             :max-size="2048" :on-format-error="handleFormatError"                             
					 :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"                              multiple type="drag"
					 action="http://99.12.136.153/CvmMobile/Interface/FilesUpload"                      style="display: inline-block;width:158px;">
						                 <div style="width: 158px;height:158px;line-height: 158px;">
							                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							               </div>
						                   </Upload>
					                    </div>
				                </Card>
			            </Col>
			        </Row>
		        <Modal title="View Image" v-model="visible">
			            <img :src="imgSrc" v-if="visible" style="width: 100%">
			        </Modal>
		    </div>
</template>
<script>
	import qqFans from '@/assets/images/qq-group1.jpg'
	import qqFans2 from '@/assets/images/qq-group2.jpg'
	import logo from '@/assets/images/logo.jpg'
	export default {
		name: 'UploadImage',
		props: ['title'],
		data() {
			return {
				defaultList: [{
						'name': 'img1',
						'url': qqFans
					},
					{
						'name': 'img2',
						'url': qqFans2
					}
				],
				imgSrc: '',
				visible: false,
				uploadList: [],
				logo,
				pStyle: {
					display: this.val='图片上传' ? 'inline-block' : 'none'
				}
			}
		},
		methods: {
			handleView(name) {
				this.uploadList.forEach((item, index) => {
					if (item.name == name) {
						this.imgSrc = item.url;
					}
				})
				this.visible = true;
			},
			handleDown(file) {
				this.downloadIamge(file.url, file.name)
			},
			//下载图片地址和图片名
			downloadIamge(imgsrc, name) {
				var image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					var canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
					var a = document.createElement("a"); // 生成一个a元素
					var event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定删除该图片么？</p>',
					onOk: () => {
						this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
					},
				});
			},
			handleSuccess(res, file) {
				this.$Notice.success({
					title: '文件上传成功',
					desc: '文件 ' + file.name + ' 上传成功。'
				});
				//                let _file = {
				//                    url: file.url,
				//                    name: file.name
				//                }
				file.url = this.logo;
				file.name = 'logo';
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件  ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 10;
				if (!check) {
					this.$Notice.warning({
						title: '最多只能上传 10 张图片。'
					});
				}
				return check;
			},
			getTitle(val) {
				this.title=val;
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
			console.log(this.title)
		}
	}
</script>
<style>
	.demo-upload-list {
		display: inline-block;
		width: 160px;
		height: 160px;
		text-align: center;
		line-height: 160px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 15px;
		margin-bottom: 4px;
	}

	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}

	.demo-upload-list-cover i {
		color: #fff;
		font-size: 25px;
		cursor: pointer;
		margin: 0 5px;
	}

	.demo-drawer-profile {
		font-size: 14px;
	}

	.demo-drawer-profile .ivu-col {
		margin-bottom: 12px;
	}
</style>
