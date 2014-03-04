Imports System.Web

Public Class ProcAD
    Inherits Proc

    Public Overloads Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcAD(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim listAD As New List(Of AD)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(0))) Then
                Continue For
            End If
            Dim aAD As New AD()
            aAD.Src = HttpUtility.HtmlDecode(GetString(aRow.Item(0)))
            aAD.Alt = GetString(aRow.Item(1))
            listAD.Add(aAD)
        Next

        Return listAD
    End Function

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Dim ADList As List(Of AD) = CType(aList, List(Of AD))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("method", "AD")

        For Each item As AD In ADList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("src", item.Src)
            xItem.SetAttributeValue("alt", item.Alt)
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Return New XElement("None", "")
    End Function

End Class

