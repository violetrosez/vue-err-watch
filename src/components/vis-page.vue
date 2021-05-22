<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    stripe
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="filename" label="文件名" width="200">
    </el-table-column>
    <el-table-column prop="colno" label="列号" width="50"> </el-table-column>
    <el-table-column prop="lineno" label="行号" width="50"> </el-table-column>
    <el-table-column prop="message" label="错误" width="200"> </el-table-column>
    <el-table-column prop="stack" label="错误堆栈"> </el-table-column>
    <el-table-column prop="userAgent" label="浏览器" width="200">
    </el-table-column>
    <el-table-column prop="date" label="报错日期" width="100">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
    };
  },
  created() {
    axios.get("http://localhost:3000/errlist").then((res) => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
     
        return "warning-row";
     
    },
  },
};
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>