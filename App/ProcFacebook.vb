Imports System.Web

Public Class ProcFacebook
    Inherits Proc

    Public Overloads Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcFacebook(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim intColCount As Integer = dt.Columns.Count
        Dim strResult As String = String.Empty
        Dim listFacebook As New List(Of Facebook)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(0))) Then
                Continue For
            End If
            Dim aFacebook As New Facebook()
            aFacebook.href = HttpUtility.HtmlDecode(GetString(aRow.Item(0)))
            listFacebook.Add(aFacebook)
        Next

        Return listFacebook
    End Function

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Dim FacebookList As List(Of Facebook) = CType(aList, List(Of Facebook))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("method", "url")

        For Each item As Facebook In FacebookList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("href", item.href)
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Return New XElement("None", "")
    End Function

End Class

