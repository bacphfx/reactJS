import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

// tạo function hiển thị nhân viên
function RenderStaffList({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg src={staff.image} />
        <CardText className="text-center">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

// Khai báo component StaffList
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffSearched: null,
    };
    this.renderBreedcrum = this.renderBreedcrum.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  // Hàm tạo nhân viên mới
  handleSubmit(values) {
    console.log(values);
  }

  // function hiển thị Breadcrumb, dùng nhiều lần
  renderBreedcrum() {
    return (
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs"></Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
        </Breadcrumb>
        <div></div>
        <div className="container">
          <LocalForm className="pull-right" onSubmit={this.handleSearch}>
            <Button
              type="submit"
              value="submit"
              className="btn btn-primary pull-right"
            >
              Seacrh
            </Button>
            <Row className="form-group">
              <Control.text
                model=".search"
                id="search"
                name="search"
                placeholder="Nhập từ khóa để tìm kiếm"
                innerRef={(input) => (this.search = input)}
              />
            </Row>
          </LocalForm>
          <LocalForm className="pull-right mr-5">
            <Button onClick={this.toggleModal}>
              <span className="fa fa-solid fa-plus"></span>
            </Button>
          </LocalForm>
        </div>
        <div className="col-12">
          <h3>Nhân viên</h3>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    model=".doB"
                    id="doB"
                    name="doB"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    model=".startDate"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    className="form-control"
                    value={this.state.department}
                    onChange={this.handleAddStaff}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    placeholder="1.0 → 3.0"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model="annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    placeholder="1"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model="overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  // Hàm thực hiện tìm kiếm
  handleSearch(event, searchResult) {
    searchResult = this.props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.search.value.toLowerCase())
    );
    this.setState({ staffSearched: searchResult });
  }

  render() {
    // Nếu chưa thực hiện tìm kiếm
    if (this.state.staffSearched == null) {
      const staffList = this.props.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-sm-4 col-md-2 mt-3">
            <RenderStaffList staff={staff} />
          </div>
        );
      });

      return (
        <div className="container">
          <this.renderBreedcrum />
          <div className="row mb-5">{staffList}</div>
        </div>
      );
    }
    // Nếu thực hiện tìm kiếm
    else {
      // Tạo mảng nhân viên từ state staffListSearched
      const staffListSearched = this.state.staffSearched.map(
        (staffSearched) => {
          return (
            <div
              key={staffSearched.id}
              className="col-6 col-sm-4 col-md-2 mt-3"
            >
              <RenderStaffList staff={staffSearched} />
            </div>
          );
        }
      );
      return (
        <div className="container">
          <this.renderBreedcrum />
          <div className="row mb-5">{staffListSearched}</div>
        </div>
      );
    }
  }
}

export default StaffList;
