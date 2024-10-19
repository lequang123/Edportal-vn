import { BackwardOutlined } from "@ant-design/icons";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import Link from "next/link";
const Breadcrumb = (props) => {
  const parentLink = props?.parentLink;
  const data = props?.data;
  return (
    <>
      <BreadcrumbAntd style={{ fontSize: "20px", fontWeight: 600 }} items={[
        {
          title: <Link href={parentLink} className="no-bg-hover">
            <BackwardOutlined
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1677ff",
                cursor: "pointer",
              }}
            />
          </Link>,
        },
        {
          title: data?.Name
        }
      ]}>
      </BreadcrumbAntd>
    </>
  );
};
export default Breadcrumb;
