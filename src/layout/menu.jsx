const accessMenu = ({ PERMISSIONS }) => {
  const master = [],
    course = [],
    measurement = [],
    estimate = [],
    schudule = [],
    summary = [],
    transcript = [],
    test_result = [],
    // assessment = [],
    teacher = [],
    teacher_class = [],
    campus = [],
    user = [],
    student = [],
    student_manage = [],
    staff = [],
    staff_move = [],
    staff_discharge = [],
    org_chart = [],
    asset = [],
    award = [],
    report = [],
    upload = [],
    report_data = [],
    report_school = [],
    record = []
    
  const _checkPermission = (data) => {
    const permission = PERMISSIONS.find(
      (item) => item.menu_name == data && item.permission_view === 1
    )
    if (permission !== undefined) {
      return true
    } else {
      return false
    }
  }

  //#region -----------------Master-------------------
  if (_checkPermission() ) {
    master.push({
      tag: "NavItem",
      name: "testA_checkPermission() ",
      to: "/",
    })
  }
  //#endregion
  
}

export default accessMenu
