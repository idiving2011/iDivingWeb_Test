Imports System.IO

Public Class FormExcelReader

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles btnReadFile.Click
        ShowMessage("開檔")
        If OpenFileDialog1.ShowDialog() = Windows.Forms.DialogResult.OK Then
            ShowMessage("開檔成功")
            ShowMessage("檔案路徑")
            TextBox1.Text += OpenFileDialog1.FileName + vbNewLine
            Try
                ExcelReader.GetInstance().Run(OpenFileDialog1.FileName)
                ShowMessage("轉檔全部成功")
            Catch ex As Exception
                ShowMessage("轉檔有錯誤訊息")
                ShowMessage("錯誤訊息" + ex.ToString())
            End Try
        End If
        ShowMessage("結束")
    End Sub

    Public Sub ShowMessage(strMessage As String)
        TextBox1.Text += strMessage + vbNewLine
        My.Application.DoEvents()
    End Sub

End Class
