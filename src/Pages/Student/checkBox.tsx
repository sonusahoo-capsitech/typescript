import React, { useState } from "react";
import { Menu, Checkbox, type MenuProps } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const CheckBox = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = async (key, checked) => {
    setCheckedItems((prevCheckedItems) => {
      const nextCheckedItems = {
        ...prevCheckedItems,
        [key]: checked,
      };
      OpenModal({ key }, checked, nextCheckedItems);
      return nextCheckedItems;
    });
  };

  // console.log("After checked", checkedItems);

  const menuItems = [
    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [
        {
          //   key: 'g1',
          //   label: 'Item 1',
          // //   type: 'group',
          //   children: [
          // {
          key: "Devloper",
          label: (
            <Checkbox
              checked={checkedItems["Devloper"]}
              onChange={async (e) => {
                const check = await handleCheckboxChange(
                  "Devloper",
                  e.target.checked
                );
                console.log(check);
                if (check) {
                  OpenModal({ key: "AIML" }, e.target.checked);
                }
              }}
            >
              Devloper
            </Checkbox>
          ),
        },
        {
          key: "AIML",
          label: (
            <Checkbox
              checked={checkedItems["AIML"]}
              onChange={async (e) => {
                const check = await handleCheckboxChange(
                  "AIML",
                  e.target.checked
                );
                if (check) {
                  OpenModal({ key: "AIML" }, e.target.checked);
                }
              }}
            >
              AIML
            </Checkbox>
          ),
          // },
          //   ],
        },
        {
          key: "g2",
          label: "Item 2",
          type: "group",
          children: [
            {
              key: "3",
              label: (
                <Checkbox
                  checked={checkedItems["3"]}
                  onChange={(e) => handleCheckboxChange("3", e.target.checked)}
                >
                  Option 3
                </Checkbox>
              ),
            },
            {
              key: "4",
              label: (
                <Checkbox
                  checked={checkedItems["4"]}
                  onChange={(e) => handleCheckboxChange("4", e.target.checked)}
                >
                  Option 4
                </Checkbox>
              ),
            },
          ],
        },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "5",
          label: (
            <Checkbox
              checked={checkedItems["5"]}
              onChange={(e) => handleCheckboxChange("5", e.target.checked)}
            >
              Option 5
            </Checkbox>
          ),
        },
        {
          key: "6",
          label: (
            <Checkbox
              checked={checkedItems["6"]}
              onChange={(e) => handleCheckboxChange("6", e.target.checked)}
            >
              Option 6
            </Checkbox>
          ),
        },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            {
              key: "7",
              label: (
                <Checkbox   
                  checked={checkedItems["7"]}
                  onChange={(e) => handleCheckboxChange("7", e.target.checked)}
                >
                  Option 7
                </Checkbox>
              ),
            },
            {
              key: "8",
              label: (
                <Checkbox
                  checked={checkedItems["8"]}
                  onChange={(e) => handleCheckboxChange("8", e.target.checked)}
                >
                  Option 8
                </Checkbox>
              ),
            },
          ],
        },
      ],
    },
    { type: "divider" },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
      children: [
        {
          key: "9",
          label: (
            <Checkbox
              checked={checkedItems["9"]}
              onChange={(e) => handleCheckboxChange("9", e.target.checked)}
            >
              Option 9
            </Checkbox>
          ),
        },
        {
          key: "10",
          label: (
            <Checkbox
              checked={checkedItems["10"]}
              onChange={(e) => handleCheckboxChange("10", e.target.checked)}
            >
              Option 10
            </Checkbox>
          ),
        },
        {
          key: "11",
          label: (
            <Checkbox
              checked={checkedItems["11"]}
              onChange={(e) => handleCheckboxChange("11", e.target.checked)}
            >
              Option 11
            </Checkbox>
          ),
        },
        {
          key: "12",
          label: (
            <Checkbox
              checked={checkedItems["12"]}
              onChange={(e) => handleCheckboxChange("12", e.target.checked)}
            >
              Option 12
            </Checkbox>
          ),
        },
      ],
    },
  ];

  const OpenModal = (
    info: { key: string },
    checked: boolean,
    checkedItemsParam?: any 
  ) => {

    console.log()
    const items = checkedItemsParam || checkedItems;
    const trueKey = Object.keys(items).filter((key) => items[key] === true);
    console.log(typeof(trueKey));
    console.log("The True key are", trueKey);
  };

  return (
    <Menu
      mode="inline"
      style={{ width: 256 }}
      items={menuItems}
      onClick={OpenModal}
    />
  );
};

export default CheckBox;
