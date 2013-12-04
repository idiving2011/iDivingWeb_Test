Imports Excel.Core
Imports System.IO
Imports Excel

Public Class ExcelReader

    Private Shared m_Instance As New ExcelReader

    Private Sub New()

    End Sub

    Public Shared Function GetInstance() As ExcelReader
        Return m_Instance
    End Function

    Public Sub Run(strFilePath As String)

        Dim stream As FileStream = File.Open(strFilePath, FileMode.Open, FileAccess.Read)

        '1. Reading from a binary Excel file ('97-2003 format; *.xls)
        'Dim excelReader As IExcelDataReader = ExcelReaderFactory.CreateBinaryReader(stream)
        '...
        '2. Reading from a OpenXml Excel file (2007 format; *.xlsx)
        Dim excelReader As IExcelDataReader = ExcelReaderFactory.CreateOpenXmlReader(stream)
        '...
        '3. DataSet - The result of each spreadsheet will be created in the result.Tables
        'Dim result As DataSet = excelReader.AsDataSet()
        '...
        '4. DataSet - Create column names from first row
        excelReader.IsFirstRowAsColumnNames = True
        Dim dsExcel As DataSet = excelReader.AsDataSet()
        excelReader.Close()
        ProcDataSet(dsExcel)
    End Sub

    Private Sub ProcDataSet(ds As DataSet)
        Dim intTableCount As Integer = ds.Tables.Count

        For Each dt As DataTable In ds.Tables
            Dim aProc As Proc = Proc.Create(dt.TableName)
            aProc.Start(dt)
        Next
    End Sub

End Class
