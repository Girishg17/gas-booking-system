import React from "react";
import Fab from "@mui/material/Fab";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import axios from "axios";
export default function Modification() {
  const [output, setOutput] = React.useState("");
  const handleRunQuery = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/api/runModification")
      .then((response) => {
        let res_data = response.data;
        const company_list = [
          ...new Set(res_data.map((item) => item.company_name)),
        ].map((item) => ({ company_name: item, username: [] }));
        res_data.forEach((item) => {
          company_list.forEach((company) => {
            if (company.company_name === item.company_name) {
              company.username.push(item.username);
            }
          });
        });
        console.log(company_list);
        console.log(response.data);
        setOutput(company_list);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRundelete = () => {
    setOutput("");
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/runDeletefromSubscriber")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: "90px",
        }}
        onClick={handleRunQuery}
      >
        <PlayArrowRoundedIcon sx={{ mr: 1 }} />
        Run
      </Fab>

      <div
        style={{
          paddingInline: "30px",
          minWidth: "100%",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <Box
          sx={{
            minWidth: "100%",
            maxWidth: "100%",
            color: "white",
            borderRadius: "5px",
            border: "1px solid #3f51b5",
            minHeight: "270px",
            padding: "10px",
            overflowX: "auto",
          }}
        >
          {output ? (
            <table className="table table-striped">
              <thead>
                <tr key={"head"}>
                  {Object.keys(output[0]).map((key) => {
                    return <th key={key}>{key}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {output.map((row, index) => {
                  return (
                    <tr key={index}>
                      {Object.keys(row).map((key) => {
                        return (
                          <td key={key}>
                            {Array.isArray(row[key])
                              ? row[key].map((item) => {
                                  return <p>{item}</p>;
                                })
                              : row[key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </Box>
      </div>
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        sx={{
          position: "absolute",
          top: 50,
          right: 10,
          width: "90px",
          paddingInline: "50px",  
        }}
        onClick={handleRundelete}
      >
        <DeleteIcon sx={{ mr: 1, color: "#FF0000" }} />
        delete
      </Fab>
    </div>
  );
}
