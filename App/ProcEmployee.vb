Imports System.Web

Public Class ProcEmployee
    Inherits Proc

    Public Overloads Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcEmployee(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim listEmployee As New List(Of Employee)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(0))) Then
                Continue For
            End If
            Dim aEmployee As New Employee()
            aEmployee.Name = GetString(aRow.Item(0))
            aEmployee.Title = GetString(aRow.Item(1))
            aEmployee.Src = HttpUtility.HtmlDecode(GetString(aRow.Item(2)))
            aEmployee.Href = HttpUtility.HtmlDecode(GetString(aRow.Item(3)))
            aEmployee.Message = GetString(aRow.Item(4)).Replace(vbLf, "<br />")
            aEmployee.Specialty = GetString(aRow.Item(5))
            Dim strArr() As String = aEmployee.Specialty.Split(",")
            For Each s As String In strArr
                aEmployee.SpecialtyList.Add(s.Trim())
            Next
            listEmployee.Add(aEmployee)
        Next

        Return listEmployee
    End Function

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Dim EmployeeList As List(Of Employee) = CType(aList, List(Of Employee))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("caption", m_StrTableName)
        xBlockEle.SetAttributeValue("method", "scroll")
        xBlockEle.SetAttributeValue("href", m_StrPhpFileName)

        For Each item As Employee In EmployeeList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("name", item.Name)
            xItem.SetAttributeValue("title", item.Title)
            xItem.SetAttributeValue("src", item.Src)
            xItem.SetAttributeValue("message", item.Message)
            xItem.SetAttributeValue("href", item.Href)
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Dim EmployeeList As List(Of Employee) = CType(aList, List(Of Employee))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("method", "card")


        For Each item As Employee In EmployeeList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("src", item.Src)
            xItem.SetAttributeValue("href", item.Href)

            xItem.Add(New XElement("Title", item.Title))
            xItem.Add(New XElement("Name", item.Name))
            xItem.Add(New XElement("Message", item.Message))

            For Each s As String In item.SpecialtyList
                xItem.Add(New XElement("Specialty", s))
            Next

            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function
End Class