# Filter Editor

## Description

Provides a way to edit the filter for the current dialog.

## Prompt Variable

| Variable                | Type     | Description                               |
| ----------------------- | -------- | ----------------------------------------- |
| `{system_message}`      | `string` | The system message for the current robot. |
| `{history}`             | `string` | The formated string of diaogs.            |
| `{last_user_request}`   | `string` | The last user request.                    |
| `{last_robot_response}` | `string` | The last robot response.                  |

warning:: The `{history}` value will be formatted as follows:

```text
User: <user request 1>
Robot: <robot response 1>
User: <user request 2>
Robot: <robot response 2>
...
```
