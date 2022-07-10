import React from "react";
import { Media, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";
import { FadeTransform } from "react-animation-components";

function RenderStaffDetail({ staff }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <div key={staff.id}>
        <Media tag="li">
          <img
            className="col-12 col-sm-4 col-md-3"
            src={staff.image}
            alt={staff.name}
          />

          <Media body className="col-12 col-sm-8 col-md-9 ml-1">
            <Media heading>Họ và tên: {staff.name}</Media>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {staff.department}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày làm thêm: {staff.overTime}</p>
          </Media>
        </Media>
      </div>
    </FadeTransform>
  );
}

const StaffDetail = (props) => {
  if (props.staffLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.staffErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.staffErrMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff != null) {
    return (
      <div className="container mb-3">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <RenderStaffDetail staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
